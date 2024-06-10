import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useAppSelector, useAppDispatch } from '../redux/hook';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../firebase';
import { UpdateForm } from '../types/types';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess
} from '../redux/user/userSlice';
import { UserService } from '../services/user.service';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export const DashProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, error } = useAppSelector((state) => state.user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<
    number | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);
  const [imageFileUploading, setImageFileUploading] = useState<boolean>(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<UpdateForm>>({});
  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const data = await UserService.updateUser(formData, currentUser?._id);
      if (data) {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess(`User's profile updated successfully`);
      }
    } catch (error: any) {
      dispatch(updateFailure(error.response.data.message));
      setUpdateUserError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }

    if (!imageFile) {
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + (imageFile.name || '');
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(Math.round(progress));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      if (currentUser) {
        dispatch(deleteUserStart());
        const data = await UserService.deleteUser(currentUser._id);
        if (data) {
          dispatch(deleteUserSuccess());
        }
      }
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignout = async () => {
    try {
      const data = await UserService.signout();
      if (data) {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current?.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser?.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className="cursor-pointer">Delete Account</span>
        <span onClick={handleSignout} className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={()=> setShowModal(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
