@pending_friends.each do |user|
  json.set! user.id do
    json.extract! user, :email, :id
    json.photoUrl url_for(user.photo)
  end
end
