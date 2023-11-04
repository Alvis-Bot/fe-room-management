import {FC, useEffect} from "react";
import {Badge, Descriptions, DescriptionsProps, Modal} from "antd";
import {useDispatch} from "react-redux";
import {getEventByIdAsyncThunk} from "../../redux/slices/event.ts";
import {useAppSelector} from "../../redux/hooks.ts";

type EventDetailModalProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    selectedId: number
}



export const EventDetailModal : FC<EventDetailModalProps> = ({isOpen, setIsOpen, selectedId}) => {


    const dispatch = useDispatch()

    const {selectedEvent} = useAppSelector(state => state.events)
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tên sự kiện',
            children: selectedEvent?.name,
        },
        {
            key: '2',
            label: 'Ngày',
            children: selectedEvent?.date.toString(),
        },
        {
            key: '3',
            label: 'Tối thiểu',
            children: selectedEvent?.minParticipants,
        },
        {
            key: '4',
            label: 'Thời gian bắt đầu',
            children: selectedEvent?.startTime.toString(),
        },
        {
            key: '5',
            label: 'Thời gian kết thúc',
            children: selectedEvent?.endTime.toString(),
            span: 2,
        },
        {
            key: '6',
            label: 'Trạng thái',
            children: (
                <>
                    {
                        selectedEvent?.status === "UPCOMING" ? <Badge status="processing" text="Đang diễn ra" /> : <Badge status="success" text="Đã hoàn thành" />
                    }
                </>
            ),
            span: 3,
        },
        {
            key: '7',
            label: 'Địa điểm',
            children: selectedEvent?.location,
            span: 3,
        },

        {
            key: '10',
            label: 'Mô tả',
            // nếu có /n thì thêm br
            children: (
                <>
                    {
                        selectedEvent?.description?.split("\n").map((item, index) => (
                            <span key={index}>
                                {item}
                                <br/>
                            </span>
                        ))
                    }
                </>
            )
        },
    ];

    useEffect(() => {
        dispatch(getEventByIdAsyncThunk(selectedId))
    }, [dispatch, selectedId])


    return (
        <Modal

            width={1000}
            centered={true}
            onCancel={() => setIsOpen(false)}
            footer={null}

            title="CHI TIẾT SỰ KIỆN" open={isOpen}>

            <Descriptions
                style={{
                    marginTop: "30px"
                }}
                items={items}
                bordered
                />

        </Modal>
    )
}