import { Modal, ToggleBtn, Follow, FollowContainer, TogglebtnContainer, Container, FollowBtn } from './style';
import { getFollowing, getFollower, addFollow } from '../../../Api/MyinfoApi';
import { useState, useEffect } from 'react';
const FollowModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, select } = props;
  const [choice, setChoice] = useState(select);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  const handleChoice = (e) => {
    setChoice(e.target.value);
  };
  const removeFollowing = (id) => {
    setFollowingList(followingList.filter((user) => user.id !== id));
    addFollow(id).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    let isValidScope = true;

    const fetchData = async () => {
      let followingsList = await getFollowing();
      if (!isValidScope) {
        return;
      }

      let followersList = await getFollower();
      if (!isValidScope) {
        return;
      }

      const followingUserIds = followingList?.map((f) => f.id);

      followersList = followersList?.map((follower) => {
        return followingUserIds?.includes(follower.id) ? { ...follower, isFollowing: true } : follower;
      });

      setFollowerList(followersList);

      followingsList = followingsList?.map((following) => {
        return followingUserIds?.includes(following.id) ? { ...following, isFollowing: true } : following;
      });

      setFollowingList(followingsList);
    };

    fetchData();

    return () => {
      isValidScope = false;
    };
  }, []);
  const onFollowFollower = (followerId) => {
    const followersList = followerList?.map((follower) => {
      return follower.id === followerId ? { ...follower, isFollowing: true } : follower;
    });
    setFollowerList(followersList);
  };

  const onUnfollowFollower = (followerId) => {
    const followersList = followerList?.map((follower) => {
      return follower.id === followerId ? { ...follower, isFollowing: false } : follower;
    });
    setFollowerList(followersList);
  };

  const onFollowFollowing = (followingId) => {
    const followingsList = followingList?.map((following) => {
      return following.id === followingId ? { ...following, isFollowing: true } : following;
    });
    setFollowingList(followingsList);
  };

  const onUnfollowFollowing = (followingId) => {
    const followingsList = followingList?.map((following) => {
      return following.id === followingId ? { ...following, isFollowing: false } : following;
    });
    setFollowingList(followingsList);
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
                    ? followingList.map((follow, idx) => {
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
                    : followerList.map((follow, idx) => {
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

export default FollowModal;
