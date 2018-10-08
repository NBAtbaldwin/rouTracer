json.user do
  json.extract! user, :id, :email
  json.extract! friend_ids, :friend_ids
end

json.friends do
  friends.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :email
    end
  end
end
