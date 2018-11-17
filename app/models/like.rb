class Like < ApplicationRecord
  validates :user_id, presence: true, uniqueness: { :scope => [:likeable_id, :likeable_type], message: "should happen once per year" }
  
  belongs_to :likeable, polymorphic: true
  belongs_to :user

end
