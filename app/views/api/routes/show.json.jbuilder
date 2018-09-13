json.route do
  json.extract! @route, :id, :activity_type, :coordinates_list, :user_id, :description, :est_duration, :elevation, :distance
end

json.user do
  json.extract! @route.user, :id, :email, :name
end
