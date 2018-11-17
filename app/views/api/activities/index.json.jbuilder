json.activity do
  @activities.each do |activity|
    json.set! activity.id do
      json.extract! activity, :id, :distance, :duration, :elevation, :activity_type, :date, :title, :user_id, :route_id, :created_at, :updated_at
    end
  end
end

json.route do
  @routes.each do |route|
    json.set! route.id do
      json.extract! route, :route_name, :id, :activity_type, :coordinates_list, :user_id, :description, :est_duration, :elevation, :distance, :created_at, :updated_at, :marker_coordinates
    end
  end
end

json.like do
  @likes.each do |like|
    json.set! like.id do
      json.extract! like, :id, :user_id, :likeable_id, :likeable_type 
    end
  end
end
