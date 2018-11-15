class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :body, default: ""
      t.integer :activity_id, null: false
      t.timestamps
    end
  end
end
