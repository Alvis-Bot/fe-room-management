import {Button, Col, Form, Input, Modal, Row, Table, Transfer, TransferProps} from "antd";
import React, {FC, useEffect, useState} from "react";
import {useAppDispatch} from "../../redux/hooks.ts";
import {TransferItem} from "antd/es/transfer";
import {TableRowSelection} from "antd/es/table/interface";
import {ColumnsType} from "antd/es/table";
import difference from "lodash/difference";
import {UsersService} from "../../api/usersService.ts";
import TextArea from "antd/es/input/TextArea";
import {AttendanceCreatePayload, AttendanceDetailPayload} from "../../api/attendanceService.ts";
import {createAttendanceAsyncThunk} from "../../redux/slices/attendance.ts";
import {ERole} from "../../type.ts";

type AttendanceModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void
}


interface DataType {
    key: number;
    id: string;
    name: string;
    roles: string;
    studentCode?: string;
}

type TableTransferProps = TransferProps<TransferItem> & {
    dataSource: DataType[];
    leftColumns: ColumnsType<DataType>;
    rightColumns: ColumnsType<DataType>;
}


const leftTableColumns: ColumnsType<DataType> = [
    {
        dataIndex: 'studentCode',
        title: 'Mã số sinh viên',
        key: 'studentCode',
    },
    {
        dataIndex: 'name',
        title: 'Họ và tên',
        key: 'name',
    },
    {
        dataIndex: 'roles',
        title: 'Quyền hạn',
        key: 'roles',
        render: (text: ERole) => {
            switch (text) {
                case ERole.ADMIN:
                    return "Quản trị viên"
                case ERole.MANAGER:
                    return "Quản lý"
                case ERole.INTERN:
                    return "Thực tập sinh"
                case ERole.USER:
                    return "Người dùng"
                default:
                    return "Không xác định"
            }
        }
    },
];

const rightTableColumns: ColumnsType<DataType> = [

    {
        dataIndex: 'studentCode',
        title: 'Mã số sinh viên',
        key: 'studentCode',
    },
    {
        dataIndex: 'name',
        title: 'Họ và tên',
        key: 'name',
    },
    {
        dataIndex: 'roles',
        title: 'Quyền hạn',
        key: 'roles',
        render: (text: ERole) => {
            switch (text) {
                case ERole.ADMIN:
                    return "Quản trị viên"
                case ERole.MANAGER:
                    return "Quản lý"
                case ERole.INTERN:
                    return "Thực tập sinh"
                case ERole.USER:
                    return "Người dùng"
                default:
                    return "Không xác định"
            }
        }
    },
];
const TableTransfer = ({leftColumns, rightColumns, ...restProps}: TableTransferProps) => (

    <Transfer {...restProps}>
        {({
              direction,
              filteredItems,
              onItemSelectAll,
              onItemSelect,
              selectedKeys: listSelectedKeys,
              disabled: listDisabled,
          }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection: TableRowSelection<TransferItem> = {
                getCheckboxProps: (item) => ({disabled: listDisabled || item.disabled}),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter((item) => !item.disabled)
                        .map(({key}) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys as string[], selected);
                },
                onSelect({key}, selected) {
                    onItemSelect(key as string, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{pointerEvents: listDisabled ? 'none' : undefined}}
                    onRow={({key, disabled: itemDisabled}) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key as string, !listSelectedKeys.includes(key as string));
                        },
                    })}
                />
            );
        }}


    </Transfer>
);

const AttendanceModal: FC<AttendanceModalProps> = ({isModalOpen, setIsModalOpen}) => {
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    console.log(targetKeys)
    const dispatch = useAppDispatch()
    const onFinish = (values: AttendanceCreatePayload) => {
        console.log(values)
        const  attendanceDetailPayload  : AttendanceDetailPayload[] = targetKeys.map((id) => {
            return {
                userId: parseInt(id),
            }
        })
        const payload: AttendanceCreatePayload = {
            title: values.title,
            description: values.description,
            attendanceDetails: attendanceDetailPayload
        }

        dispatch(createAttendanceAsyncThunk(payload))

    };


    const onChange = (nextTargetKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };


    const [isLoad, setIsLoad] = useState(false)
    const [mockData, setMockData] = useState<DataType[]>([])

    useEffect(() => {
        setIsLoad(true)
        UsersService.getUsersNoPagination().then((res) => {
            console.log(res)
            const data = res.data.map((user) => {
                return {
                    key: user.id,
                    id: user.id,
                    name: user.fullName,
                    roles: user.roles,
                    studentCode: user.studentCode
                } as unknown as DataType
            })
            setMockData(data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoad(false)
        })
    }, [])

    return (
        <Modal
            width={1000}
            centered={true}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            title="TẠO DANH SÁCH ĐIỂM DANH" open={isModalOpen}>

            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        layout="vertical">
                        <Form.Item
                            name="title"
                            label="Tên danh sách điểm danh"
                            rules={[{required: true, message: 'Please input the title of collection!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[{required: true, message: 'Please input the location of collection!'}]}
                        >
                            <TextArea/>
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Khởi tạo
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24}>
                    <TableTransfer
                        dataSource={mockData}
                        targetKeys={targetKeys}
                        onChange={onChange}
                        leftColumns={leftTableColumns}
                        rightColumns={rightTableColumns}
                        showSearch
                        filterOption={(inputValue, item) =>
                            item.name.indexOf(inputValue) !== -1 || item.roles.indexOf(inputValue) !== -1
                        }
                    />
                </Col>

            </Row>


        </Modal>
    )
}

export default AttendanceModal