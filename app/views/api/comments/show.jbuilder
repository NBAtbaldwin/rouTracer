json.comment do
  json.extract! @comment, :id, :body, :activity_id, :user_id
end
