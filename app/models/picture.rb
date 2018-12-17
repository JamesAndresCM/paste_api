class Picture < ApplicationRecord
  
  #pagination
  self.per_page = 10

  #set uuid before create
  before_validation :set_uuid_img

  #mount carrierwave uploader and set filename img
  mount_base64_uploader :img, ImgUploader, file_name: -> (_) { SecureRandom.uuid }
  
  #validate presence img, size, and content_type
  validates :img, presence: true, file_size: { in: 100.bytes..2.megabyte }, file_content_type: { allow: ['image/jpeg', 'image/png', 'image/jpg'], mode: :strict }

  # set uuid method
  def set_uuid_img
    self.uuid ||= SecureRandom.uuid.first(6)
  end
end
