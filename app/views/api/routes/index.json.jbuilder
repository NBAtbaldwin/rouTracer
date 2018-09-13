@routes.each do |route|
  json.set! route.id do
    json.extract! route, :id, :activity_type, :coordinates_list, :user_id, :description, :est_duration, :elevation, :distance
  end
end
