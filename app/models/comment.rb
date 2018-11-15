# == Schema Information
#
# Table name: comments
#
#  id          :bigint(8)        not null, primary key
#  body        :string           default("")
#  activity_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Comment < ApplicationRecord
  validates :activity_id, presence: true

  belongs_to :activity

  belongs_to :user

  def self.friend_comments(user_id)
    user = User.find(user_id)
    friends = user.friends_with_comments
    comments = []
    friends.each do |friend|
      comments.concat(friend.comments)
    end
    comments
  end
end
