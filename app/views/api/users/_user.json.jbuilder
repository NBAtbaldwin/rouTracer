json.user do
  json.extract! user, :id, :email
  json.photoUrl url_for(user.photo)
  json.extract! friend_ids, :friend_ids
  json.extract! requester_ids, :requester_ids
  json.extract! requested_ids, :requested_ids
end

json.friends do
  friends.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :email
      json.photoUrl url_for(friend.photo)
    end
  end
end
