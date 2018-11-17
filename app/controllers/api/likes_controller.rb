class Api::LikesController < ApplicationController

  # def index
  #   @likes = Like.friend_likes(current_user.id) + current_user.likes.to_a
  # end

  def show
    @like = Like.find(params[:id])
    if @like
      render :show
    else
      render json: ["Unauthorized like request"], status: 401
    end
  end

  def create
    @like = Like.new(like_params)
    if @like.save
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find(params[:id])
    if @like.destroy
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :likeable_type, :likeable_id, :id)
  end
end
