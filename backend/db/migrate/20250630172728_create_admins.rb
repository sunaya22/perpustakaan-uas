class CreateAdmins < ActiveRecord::Migration[8.0]
  def change
    create_table :admins do |t|
      t.string :username
      t.string :password
      t.string :nama
      t.string :level
      t.string :kontak
      t.date :tanggal

      t.timestamps
    end
  end
end
