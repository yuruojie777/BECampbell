import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from "react";
import server from "../constName/url";
class UploadDemo extends React.Component {



    constructor(props) {
        super(props);
        this.filetype = props.filetype;
    }
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = async () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });
        this.setState({
            uploading: true,
        });
        // You can use any AJAX library you like
        await fetch(server+'/campbell/upload/'+this.filetype, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    fileList: [],
                });
                console.log(data);
                if(data.error !== null) message.error(data.error);
                else message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                this.setState({
                    uploading: false,
                });
            });
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </>
        );
    }
}

export default UploadDemo;