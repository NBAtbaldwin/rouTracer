class RemoveUsernameFromUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :name, :string
    remove_column :users, :username, :string
  end
end
