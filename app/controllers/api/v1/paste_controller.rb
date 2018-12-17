class Api::V1::PasteController < ApplicationController
  before_action :set_paste, only: %i(show update destroy)

  def show
    if @paste["exposure"] == "public"
      render json: { data: Paste.check_exposure_paste(@paste), status: 200 }
    else
      render json: { msg: "Paste not found", status: 404}
    end
  end

  def private_paste
    @paste = Paste.get_private_paste(params[:id].parameterize,params[:private_uuid])
    if @paste.blank?
      render json: { msg: "Paste not found", status: 404}
    else
      render json: { data: @paste, status: 200 }
    end
  end


  def create
    @paste = Paste.new(paste_params)
    if @paste.save
      @paste_final = Paste.check_exposure_paste(@paste)
      render json: { data: @paste_final, msg: "Paste has been created",status: 201 }
    else
      render json: { msg: @paste.errors, status: 422 }
    end
  end

  def update
    if @paste.update(paste_params)
      render json: { data: Paste.check_exposure_paste(@paste), msg: "Paste has been updated", status: 200 }
    else
      render json: { msg: @paste.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    render json: { msg: "Paste has been destroyed", status: 200 } if @paste.destroy
  end


  private

  def set_paste
    @paste = Paste.find_by("uuid = ? OR private_uuid = ?",params[:uuid],params[:uuid])
    if @paste.blank?
      render json: {msg: "Paste not found", status: 404}
    end
  end

  def paste_params
    params.require(:paste).permit(:uuid, :content, :title, :exposure)
  end
end
