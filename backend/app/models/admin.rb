class Admin < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    validates :nama, presence: true
    validates :level, inclusion: { in: %w[superadmin admin], message: "%{value} is not a valid level" }
    validates :kontak, presence: true
    validates :tanggal, presence: true, allow_blank: true
end
