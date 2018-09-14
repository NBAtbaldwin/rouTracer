# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Route.destroy_all

# def gen_route_name
#   Faker::Cannabis.buzzword + " " + Faker::Company.buzzword
# end
#
# def activity_type
#   num = rand(2)
#   num == 1 ? "biking" : "running"
# end
#
# def gen_description
#   output = ""
#   3.times do
#     output += Faker::Cannabis.strain + " " + Faker::Company.buzzword + " "
#   end
#   output
# end
#
# def gen_dist
#   rand(51)
# end
#
# def gen_elev
#   rand(1001)
# end
#
# def gen_dur
#   rand(4001)
# end


demo_user = User.create(email: "user@example.com", password: "demouser", name: "Demo User" )

route1 = Route.create(route_name: 'demo route', activity_type: 'biking', coordinates_list: 'asdfasfsadfsadfas', user_id: demo_user.id, distance: 4, est_duration: 30, elevation: 400, description: 'this is the demo route')

# user_1 = User.create(email: "bobby@shmurda.com", password: "shmurda", name: "Bobby Shmurda")

# route_1 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: demo_user.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_2 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: user_1.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_3 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: user_1.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_4 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: user_1.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_5 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: demo_user.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_6 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: demo_user.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_7 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: user_1.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_8 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: user_1.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_9 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: user_1.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
#
# route_10 = Route.create(route_name: gen_route_name, activity_type: activity_type, coordinates_list: SecureRandom::base64, user_id: demo_user.id, distance: gen_dist, est_duration: gen_dur, elevation: gen_elev, description: gen_description)
