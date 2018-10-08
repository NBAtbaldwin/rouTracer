# == Schema Information
#
# Table name: friendships
#
#  id           :bigint(8)        not null, primary key
#  requester_id :integer          not null
#  requestee_id :integer          not null
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Friendship < ApplicationRecord

  belongs_to :requester,
  foreign_key: :requester_id,
  class_name: :User

  belongs_to :requestee,
  foreign_key: :requestee_id,
  class_name: :User

end
