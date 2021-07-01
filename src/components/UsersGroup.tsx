import React, { useContext, useEffect, useState } from 'react';
import { useVirtual } from 'react-virtual';
import User from '../types/User';
import AppContext from './AppContext';
import SortedUserCard from './SortedUserCard';

interface IUsersGroup {
  users: User[];
  search: string;
  num: number;
}

const UsersGroup: React.FC<IUsersGroup> = ({ users, search, num }) => {
  const parentRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const { setDragToFav } = useContext(AppContext);
  const [filtered, setFiltered] = useState(users);
  const [collapse, setCollapse] = useState(false);

  const rowVirtualizer = useVirtual({
    size: filtered.length,
    estimateSize: React.useCallback(() => 82, []),
    parentRef,
  });

  useEffect(() => {
    setFiltered(
      users.filter(
        (user) => `${user.name.first} ${user.name.last}`.indexOf(search) !== -1
      )
    );
  }, [users, search, setFiltered]);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    i: number,
    id: number
  ) => {
    e.dataTransfer.setData('add-favorite', JSON.stringify([i, id]));
    setDragToFav(true);
  };

  const dragEndHandler = () => {
    setDragToFav(false);
  };

  return (
    <div className="users-group">
      <h3
        className={
          'group-header ' +
          (filtered.length === 0 ? 'disabled ' : ' ') +
          (collapse ? 'collapsed ' : ' ')
        }
        onClick={handleCollapse}
      >
        {num * 10 + 1}-{num * 10 + 10}
      </h3>
      <div className={collapse ? 'hideme' : ''}>
        <div
          ref={parentRef}
          style={{
            maxHeight: `100vh`,
            overflow: 'auto',
          }}
        >
          <div
            className="list-inner"
            style={{
              height: `${rowVirtualizer.totalSize}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.virtualItems.map((virtualRow) => {
              const user = filtered[virtualRow.index];
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <SortedUserCard
                    user={user}
                    highlight={search}
                    dragStartHandler={(e) =>
                      dragStartHandler(e, num, users.indexOf(user))
                    }
                    dragEndHandler={() => dragEndHandler()}
                    key={user.login.uuid}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersGroup;
