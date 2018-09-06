json.array!  @users do |user|
  json.id  user.id
  json.name  user.name
  json.emal user.email
end
