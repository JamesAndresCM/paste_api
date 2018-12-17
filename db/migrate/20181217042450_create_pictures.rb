class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string :img
      t.string :uuid
      t.timestamps
    end
    add_index :pictures, :img
    add_index :pictures, :uuid
  end
end
