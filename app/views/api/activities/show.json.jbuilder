json.activity do
  json.extract! @activity, :id, :distance, :duration, :elevation, :activity_type, :date, :title, :user_id, :route_id, :created_at, :updated_at
end

json.routes do
  @routes.each do |route|
    json.set! route.id do
      json.extract! route, :id, :route_name, :activity_type, :coordinates_list, :user_id, :description, :est_duration, :elevation, :distance, :created_at, :updated_at, :marker_coordinates
    end
  end
end

json.comment do
  @comments.each do |comment|
    json.extract! comment, :id, :body
  end
end
