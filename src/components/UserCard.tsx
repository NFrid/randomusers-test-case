import { FC, useEffect, useState } from 'react';
import User from '../types/User';

interface IUserCard {
  user: User;
  highlight?: string;
}

const UserCard: FC<IUserCard> = ({ user, highlight }) => {
  const [fullName, setFullName] = useState('');

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', user.login.uuid)
  }

  useEffect(() => {
    const name = `${user.name.first} ${user.name.last}`;
    setFullName(
      highlight ? name.replace(highlight, `<b>${highlight}</b>`) : name
    );
  }, [highlight, user]);

  return (
    <div className="user-card" draggable onDrag={dragHandler}>
      <img className="photo" src={user.picture.medium} alt="" draggable={false} />
      <div className="credentials">
        <div className="credentials-top">
          <div
            className="name"
            dangerouslySetInnerHTML={{ __html: fullName }}
          />
          <div className="registration-date">
            {new Date(user.registered.date).toLocaleDateString()}
          </div>
        </div>
        <div className="credentials-bottom">
          <div className="email">{user.email}</div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
