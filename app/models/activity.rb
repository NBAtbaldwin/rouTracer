# == Schema Information
#
# Table name: activities
#
#  id            :bigint(8)        not null, primary key
#  distance      :float            not null
#  duration      :integer          not null
#  elevation     :integer
#  activity_type :string           not null
#  date          :datetime         not null
#  title         :string           not null
#  user_id       :integer          not null
#  route_id      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Activity < ApplicationRecord
  validates :distance, :duration, :activity_type, :date, :title, :user_id, presence: true

  belongs_to :route,
    optional: true

  belongs_to :user
end
