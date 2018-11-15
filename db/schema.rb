# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_15_222918) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "activities", force: :cascade do |t|
    t.float "distance", null: false
    t.integer "duration", null: false
    t.integer "elevation"
    t.string "activity_type", null: false
    t.string "title", null: false
    t.integer "user_id", null: false
    t.integer "route_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "date", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string "body", default: ""
    t.integer "activity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "requester_id", null: false
    t.integer "requestee_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["requester_id", "requestee_id"], name: "index_friendships_on_requester_id_and_requestee_id", unique: true
  end

  create_table "routes", force: :cascade do |t|
    t.string "route_name", null: false
    t.string "activity_type", null: false
    t.string "coordinates_list", null: false
    t.integer "user_id", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "est_duration", null: false
    t.integer "elevation", null: false
    t.float "distance", null: false
    t.float "marker_coordinates", null: false, array: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
