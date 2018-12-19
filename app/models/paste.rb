class Paste < ApplicationRecord
  
  validates_presence_of :content
  before_validation :set_uuid_paste, on: [:update,:create]
  
  enum exposure: {
    public: 0, 
    private: 1
  }.freeze, _prefix: :exposure

  validates :exposure, inclusion: { in: 
    exposures.keys, 
    message: "Error not a valid exposure, only public and private" 
  }
  
  scope :get_private_paste, ->(id,uuid) { 
    where("pastes.id = ? AND pastes.private_uuid = ?", id, uuid)
    .as_json(except: [:updated_at,:exposure,:uuid]) 
  }

  def self.check_exposure_paste(paste)
    if paste.exposure_public?
      paste.as_json(except: [:id,:private_uuid,:updated_at])
    elsif paste.exposure_private?
      paste.as_json(except: [:updated_at,:uuid])
    end
  end

  private

  def set_uuid_paste
    if self.exposure_public?
      self.uuid ||= SecureRandom.uuid.first(6)
      self.private_uuid = nil
    elsif self.exposure_private?
      self.private_uuid ||= SecureRandom.uuid.first(6)
      self.uuid = nil
    end
  end
end
