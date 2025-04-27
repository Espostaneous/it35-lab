import { useState, useEffect } from 'react';
import { 
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButton, IonInput, IonLabel, IonModal, IonFooter, IonCard, 
  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonAlert, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon, 
  IonPopover, IonItem, IonTextarea 
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, sparkles, send } from 'ionicons/icons';
import './FeedContainer.css';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (!error) setPosts(data as Post[]);
    };
    fetchUser();
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent || !user || !username) return;
  
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();
  
    if (userError) {
      console.error('Error fetching user avatar:', userError);
      return;
    }
  
    const avatarUrl = userData?.user_avatar_url || 'https://i.imgur.com/6VBx3io.png'; // Arcane-style default avatar
  
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }
      ])
      .select('*');
  
    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
    }
  
    setPostContent('');
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <IonContent className="arcane-theme">
      {user ? (
        <>
          <div className="post-creator-container">
            <IonCard className="arcane-card post-creator">
              <IonCardHeader>
                <IonCardTitle className="arcane-title">
                  <IonIcon icon={sparkles} className="sparkle-icon" />
                  Create a New Whisper
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonTextarea
                  value={postContent}
                  onIonChange={e => setPostContent(e.detail.value!)}
                  placeholder="Share your thoughts in the Undercity..."
                  rows={4}
                  className="arcane-input"
                />
              </IonCardContent>
              <div className="post-button-container">
                <IonButton 
                  onClick={createPost} 
                  className="arcane-button"
                  fill="clear"
                >
                  <IonIcon icon={send} slot="start" />
                  Post
                </IonButton>
              </div>
            </IonCard>
          </div>

          <div className="posts-container">
            {posts.map(post => (
              <IonCard key={post.post_id} className="arcane-card post-card">
                <IonCardHeader className="post-header">
                  <IonGrid>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="auto">
                        <IonAvatar className="arcane-avatar">
                          <img alt={post.username} src={post.avatar_url} />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonCardTitle className="post-username">{post.username}</IonCardTitle>
                        <IonCardSubtitle className="post-date">{formatDate(post.post_created_at)}</IonCardSubtitle>
                      </IonCol>
                      {user.id === post.user_id.toString() && (
                        <IonCol size="auto">
                          <IonButton
                            fill="clear"
                            className="post-actions-button"
                            onClick={(e) =>
                              setPopoverState({
                                open: true,
                                event: e.nativeEvent,
                                postId: post.post_id,
                              })
                            }
                          >
                            <IonIcon icon={pencil} className="action-icon" />
                          </IonButton>
                        </IonCol>
                      )}
                    </IonRow>
                  </IonGrid>
                </IonCardHeader>
              
                <IonCardContent className="post-content">
                  <IonText>
                    <p className="post-text">{post.post_content}</p>
                  </IonText>
                </IonCardContent>
                
                <IonPopover
                  isOpen={popoverState.open && popoverState.postId === post.post_id}
                  event={popoverState.event}
                  onDidDismiss={() =>
                    setPopoverState({ open: false, event: null, postId: null })
                  }
                  className="arcane-popover"
                >
                  <IonItem
                    button
                    detail={false}
                    onClick={() => {
                      startEditingPost(post);
                      setPopoverState({ open: false, event: null, postId: null });
                    }}
                    className="popover-item"
                  >
                    <IonIcon icon={pencil} slot="start" />
                    Edit
                  </IonItem>
                  <IonItem
                    button
                    detail={false}
                    color="danger"
                    onClick={() => {
                      deletePost(post.post_id);
                      setPopoverState({ open: false, event: null, postId: null });
                    }}
                    className="popover-item"
                  >
                    <IonIcon icon={trash} slot="start" />
                    Delete
                  </IonItem>
                </IonPopover>
              </IonCard>
            ))}
          </div>
        </>
      ) : (
        <div className="loading-container">
          <IonLabel className="loading-text">Connecting to the Undercity network...</IonLabel>
        </div>
      )}
   
      <IonModal 
        isOpen={isModalOpen} 
        onDidDismiss={() => setIsModalOpen(false)}
        className="arcane-modal"
      >
        <IonHeader className="modal-header">
          <IonToolbar>
            <IonTitle className="modal-title">Edit Your Whisper</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="modal-content">
          <IonTextarea
            value={postContent}
            onIonChange={e => setPostContent(e.detail.value!)}
            placeholder="Revise your whisper..."
            rows={6}
            className="arcane-input"
          />
        </IonContent>

        <IonFooter className="modal-footer">
          <IonButton 
            onClick={() => setIsModalOpen(false)} 
            className="arcane-button"
            fill="outline"
          >
            Cancel
          </IonButton>
          <IonButton 
            onClick={savePost} 
            className="arcane-button"
          >
            Save Changes
          </IonButton>
        </IonFooter>
      </IonModal>
   
      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Whisper Updated"
        message="Your message has been woven into the Undercity's tapestry."
        buttons={['Understood']}
        className="arcane-alert"
      />
    </IonContent>
  );
};

export default FeedContainer;