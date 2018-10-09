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

class User < ApplicationRecord
  validates :email, :password_digest, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  attr_reader :password

  has_many :routes
  has_many :activities

  has_many :friend_requests,
  foreign_key: :requestee_id,
  class_name: :Friendship

  has_many :requested_friends,
  foreign_key: :requester_id,
  class_name: :Friendship

  has_many :requestees,
  through: :requested_friends

  has_many :requesters,
  through: :friend_requests

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
    friends = []
    friendships = Friendship.where("requestee_id = ? OR requester_id = ?", self.id, self.id).where(status: 'accepted')
    return [] unless friendships
    friendships.each do |friendship|
      friendship.requestee_id == self.id ? friends << User.where(id: friendship.requester_id).includes(:activities).includes(:routes).first : friends << User.where(id: friendship.requestee_id).includes(:activities).includes(:routes).first
    end
    friends
  end

  def received_requesters
    pending_friends = []
    pending_friendships = Friendship.where("requestee_id = ?", self.id).where(status: 'pending')
    return [] unless pending_friendships
    pending_friendships.each do |friendship|
      pending_friends << self.requesters.where(id: friendship.requester_id).includes(:activities).includes(:routes).first
    end
    pending_friends
  end

  def sent_requestees
    pending_friends = []
    pending_friendships = Friendship.where("requester_id = ?", self.id).where(status: 'pending')
    return [] unless pending_friendships
    pending_friendships.each do |friendship|
      pending_friends << self.requestees.where(id: friendship.requestee_id).includes(:activities).includes(:routes).first
    end
    pending_friends
  end

  def friend_ids
    ids = []
    self.friends.each { |friend| ids << friend.id }
    {friend_ids: ids}
  end

  def requester_ids
    ids = []
    self.received_requesters.each { |requester| ids << requester.id }
    return {requester_ids: ids}
  end

  def requested_ids
    ids = []
    self.sent_requestees.each { |requestee| ids << requestee.id }
    return {requested_ids: ids}
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

end
