class Api::V1::PicturesController < ApplicationController
  before_action :set_picture, only: %i(show destroy)

  def index
    @pictures = except_params(Picture.order(created_at: :desc)
                      .paginate(page: params[:page]))
    render json: { data: @pictures, status: 200 }
  end

  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      render json: { data: except_params(@picture), msg: "Picture has been created", status: 200 }
    else
       render json: { msg: @picture.errors, status: 422 }
    end
  end

  def destroy
    render json: { msg: "Picture #{@picture.uuid} has been destroyed", status: 200 } if @picture.destroy
  end

  def show
    render json: { data: except_params(@picture), status: 200 }
  end


  private

  def set_picture
    @picture = Picture.find_by_uuid(params[:uuid])
  end

  def picture_params
    params.require(:picture).permit(:uuid, :img)
  end

  def except_params(obj)
    obj.as_json(except: [:updated_at,:id])
  end

end
