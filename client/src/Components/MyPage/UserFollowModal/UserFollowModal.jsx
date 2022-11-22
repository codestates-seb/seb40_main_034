import { Modal, ToggleBtn, Follow, FollowContainer, TogglebtnContainer, Container, FollowBtn } from './style';
import { getFollowing, getFollower, addFollow } from '../../../Api/MyinfoApi';
import { useState, useEffect } from 'react';
const UserFollowModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, select } = props;
  const [choice, setChoice] = useState(select);
  const [UserFollowingList, setUserFollowingList] = useState([]);
  const [MyFollowingList, setMyFollowingList] = useState([]);
  const [UserFollowerList, setUserFollowerList] = useState([]);

  const handleChoice = (e) => {
    setChoice(e.target.value);
  };
  const removeFollowing = (id) => {
    setUserFollowingList(UserFollowingList.filter((user) => user.id !== id));
    addFollow(id).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    let isValidScope = true;

    const fetchData = async () => {
      //다른유저 following
      let UserFollowingsList = await getFollowing();
      if (!isValidScope) {
        return;
      }
      //다른유저 follower
      let UserFollowersList = await getFollower();
      if (!isValidScope) {
        return;
      }
      //내 following
      const MyFollowingList = await getFollowing();
      if (!isValidScope) {
        return;
      }
      setMyFollowingList(MyFollowingList);
      //내 following 유저 ID
      const MyFollowingUserIds = MyFollowingList?.map((f) => f.id);

      //다른유저 follower 중 내가 follow한 사람 여부
      UserFollowersList = UserFollowersList?.map((follower) => {
        return MyFollowingUserIds?.includes(follower.id) ? { ...follower, isFollowing: true } : follower;
      });

      setUserFollowerList(UserFollowersList);

      //다른유저 following 중 내가 follow한 사람 여부

      UserFollowingsList = UserFollowingsList?.map((following) => {
        return MyFollowingUserIds?.includes(following.id) ? { ...following, isFollowing: true } : following;
      });

      setUserFollowingList(UserFollowingsList);
    };

    fetchData();

    return () => {
      isValidScope = false;
    };
  }, []);
  //다른유저 follower 버튼
  const onFollowFollower = (followerId) => {
    const UserFollowersList = UserFollowerList?.map((follower) => {
      return follower.id === followerId ? { ...follower, isFollowing: true } : follower;
    });
    setUserFollowerList(UserFollowersList);
  };

  const onUnfollowFollower = (followerId) => {
    const UserFollowersList = UserFollowerList?.map((follower) => {
      return follower.id === followerId ? { ...follower, isFollowing: false } : follower;
    });
    setUserFollowerList(UserFollowersList);
  };
  // 다른유저 following 버튼
  const onFollowFollowing = (followingId) => {
    const UserFollowingsList = UserFollowingList?.map((following) => {
      return following.id === followingId ? { ...following, isFollowing: true } : following;
    });
    setUserFollowingList(UserFollowingsList);
  };

  const onUnfollowFollowing = (followingId) => {
    const UserFollowingsList = UserFollowingList?.map((following) => {
      return following.id === followingId ? { ...following, isFollowing: false } : following;
    });
    setUserFollowingList(UserFollowingsList);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <Modal popup={open ? 'popup' : ''} onClick={close}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <Container onClick={(e) => e.stopPropagation()}>
              <TogglebtnContainer>
                <ToggleBtn onClick={handleChoice} value="following" choice={choice}>
                  Following
                </ToggleBtn>
                <ToggleBtn onClick={handleChoice} value="follower" choice={choice}>
                  Follower
                </ToggleBtn>
              </TogglebtnContainer>

              <FollowContainer>
                <Follow>
                  {choice === 'following'
                    ? UserFollowingList.map((follow, idx) => {
                        return (
                          <div className="follow-item" key={idx}>
                            <div className="follow-img">
                              <img src={follow.profileImg} alt="UserPic" />
                            </div>
                            <div className="follow-name">{follow.nickname}</div>

                            {follow?.isFollowing ? (
                              <FollowBtn status={'following'} onClick={() => onUnfollowFollowing(follow.id)}>
                                Unfollow
                              </FollowBtn>
                            ) : null}
                            {!follow?.isFollowing ? (
                              <FollowBtn status={'notfollowing'} onClick={() => onFollowFollowing(follow.id)}>
                                Follow
                              </FollowBtn>
                            ) : null}
                          </div>
                        );
                      })
                    : UserFollowerList.map((follow, idx) => {
                        return (
                          <div className="follow-item" key={idx}>
                            <div className="follow-img">
                              <img src={follow.profileImg} alt="UserPic" />
                            </div>
                            <div className="follow-name">{follow.nickname}</div>

                            {follow?.isFollowing ? (
                              <FollowBtn status={'following'} onClick={() => onUnfollowFollower(follow.id)}>
                                Unfollow
                              </FollowBtn>
                            ) : null}
                            {!follow?.isFollowing ? (
                              <FollowBtn status={'notfollowing'} onClick={() => onFollowFollower(follow.id)}>
                                Follow
                              </FollowBtn>
                            ) : null}
                          </div>
                        );
                      })}
                </Follow>
              </FollowContainer>
            </Container>
          </main>
          <footer></footer>
        </section>
      ) : null}
    </Modal>
  );
};

export default UserFollowModal;
