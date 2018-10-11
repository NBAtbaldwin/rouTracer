class Api::FriendshipsController < ApplicationController

  def create
    @user = current_user
    friendship = Friendship.new(friendship_params)

    if friendship.save
      @friends = @user.friends
      @friend_ids = @user.friend_ids
      @requester_ids = @user.requester_ids
      @requested_ids = @user.requested_ids
      render 'api/users/show'
    else
      render json: friendship.errors.full_messages
    end
  end

  def index
    @user = current_user
    @pending_friends = @user.received_requesters
  end

  def update
    friendship = Friendship.where(requester_id: params[:friendship][:requester_id]).where(requestee_id: params[:friendship][:requestee_id])
    @user = current_user
    if friendship.update(friendship_params)
      @friends = @user.friends
      @friend_ids = @user.friend_ids
      @requester_ids = @user.requester_ids
      @requested_ids = @user.requested_ids
      render 'api/users/show'
    else
      render json: friendship.errors.full_messages
    end
  end

  def destroy
    friendship = Friendship.where(requester_id: params[:friendship][:requester_id]).where(requestee_id: params[:friendship][:requestee_id]).first || Friendship.where(requester_id: params[:friendship][:requestee_id]).where(requestee_id: params[:friendship][:requester_id]).first
    @user = current_user
    if friendship.destroy
      @friends = @user.friends
      @friend_ids = @user.friend_ids
      @requester_ids = @user.requester_ids
      @requested_ids = @user.requested_ids
      render 'api/users/show'
    end
  end

private
  def friendship_params
    params.require(:friendship).permit(:requestee_id, :requester_id, :status)
  end

end
