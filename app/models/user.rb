# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  name            :string
#
require 'open-uri'
require 'open_uri_redirections'

class User < ApplicationRecord
  validates :email, :password_digest, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  attr_reader :password

  has_one_attached :photo

  has_many :routes
  has_many :activities
  has_many :comments

  has_many :friend_requests, -> {Friendship.pending},
  foreign_key: :requestee_id,
  class_name: :Friendship

  has_many :requested_friends, -> {Friendship.pending},
  foreign_key: :requester_id,
  class_name: :Friendship

  has_many :accepted_friend_requests, -> {Friendship.accepted},
  foreign_key: :requestee_id,
  class_name: :Friendship

  has_many :accepted_requested_friends, -> {Friendship.accepted},
  foreign_key: :requester_id,
  class_name: :Friendship

  has_many :requestees, :through => :requested_friends

  has_many :requesters, :through => :friend_requests

  has_many :accepted_requestees, :through => :accepted_requested_friends

  has_many :accepted_requesters, :through => :accepted_friend_requests


  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    save!
    self.session_token
  end

  def friends
    friends = self.accepted_requestees + self.accepted_requesters
    friends
  end

  def friends_with_activities
    friends = self.accepted_requestees.includes(:routes).includes(:activities) + self.accepted_requesters.includes(:routes).includes(:activities)
    friends
  end

  def friends_with_comments
    friends = self.accepted_requestees.includes(:comments) + self.accepted_requesters.includes(:comments)
    friends
  end

  def received_requesters
    self.requesters.includes(:activities).includes(:routes)
  end

  def sent_requestees
    self.requestees.includes(:activities).includes(:routes)
  end

  def friend_ids(friends)
    ids = []
    friends.each { |friend| ids << friend.id }
    {friend_ids: ids}
  end

  def requester_ids
    ids = []
    self.requesters.each { |requester| ids << requester.id }
    return {requester_ids: ids}
  end

  def requested_ids
    ids = []
    self.requestees.each { |requestee| ids << requestee.id }
    return {requested_ids: ids}
  end

  def gen_default_photo
    photo_url = Faker::LoremFlickr.image("400x400", ['sports', 'fitness'])
    url = URI.parse(photo_url)
    file = open(url, :allow_redirections => :safe)
    self.photo.attach(io: file, filename: "temp-photo.#{file.content_type_parse.first.split("/").last}", content_type: file.content_type_parse.first)
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

end
