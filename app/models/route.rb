# == Schema Information
#
# Table name: routes
#
#  id               :bigint(8)        not null, primary key
#  route_name       :string           not null
#  activity_type    :string           not null
#  coordinates_list :string           not null
#  user_id          :integer          not null
#  description      :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Route < ApplicationRecord
  validates :route_name, :activity_type, :coordinates_list, :user_id, presence: true
  validates :route_name, uniqueness: { scope: :user_id }

  belongs_to :user

end
