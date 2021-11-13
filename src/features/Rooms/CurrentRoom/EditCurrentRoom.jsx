export const EditCurrentRoom = ({title, setTitle,
                                    chairs, setChairs,
                                isProjector, setIsProjector,
                                isBoard, setIsBoard,
                                description, setDescription,
                                onEditRoom}) => {
    return (
        <>
            <label>Номер комнаты:
                <input
                    className={'editCurrentRoomTextInput'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>Количество мест:
                <input
                    className={'editCurrentRoomTextInput'}
                    value={chairs}
                    onChange={(e) => setChairs(e.target.value)}
                />
            </label>
            <input
                id={'editCurrentRoomIsProjector'}
                className={'editCurrentRoomCheckbox'}
                type='checkbox'
                checked={isProjector}
                onClick={() => setIsProjector(!isProjector)}
            />
            <label htmlFor={'editCurrentRoomIsProjector'}>eсть проектор</label>
            <input
                id={'editCurrentRoomIsBoard'}
                className={'editCurrentRoomCheckbox'}
                type='checkbox'
                checked={isBoard}
                onClick={() => setIsBoard(!isBoard)}
            />
            <label htmlFor={'editCurrentRoomIsBoard'}>есть доска</label>
            <label>
                Описание комнаты:
                <input
                    className={'editCurrentRoomTextInput'}
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button
                onClick={onEditRoom}
                type={'submit'}
                className='currentRoom-btn'
            >
                Сохранить изменения
            </button>
        </>
    );
};