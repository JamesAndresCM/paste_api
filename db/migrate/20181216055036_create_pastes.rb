class CreatePastes < ActiveRecord::Migration[5.2]
  def change
    create_table :pastes do |t|
      t.string :uuid
      t.string :private_uuid
      t.text :content
      t.text :title
      t.integer :exposure, default: 0

      t.timestamps
    end
  end
end
