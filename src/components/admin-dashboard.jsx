import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminDashBoard() {
    const [videos, setVideos] = useState([]);

    function LoadVideos() {
        axios.get('http://127.0.0.1:3030/get-videos')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error loading the videos!', error);
            });
    }

    useEffect(() => {
        LoadVideos();
    }, []);

    return (
        <div>
            <h5 className="text-center">Admin Dash Board</h5>
            <Link to="/add-video" className="bi bi-camera-video-fill btn btn-light "> Add New</Link>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th className="text-bg-primary">Title</th>
                        <th className="text-bg-primary">Preview</th>
                        <th className="text-bg-primary">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map((video) => (
                            <tr key={video.VideoId}>
                                <td>{video.Title}</td>
                                <td><iframe width="400" height="170" src={video.Url} title={video.Title}></iframe></td>
                                <td>
                                    <Link to={`/edit-video/${video.VideoId}`} className="bi bi-pen btn btn-warning"></Link>
                                    <Link to={`/delete-video/${video.VideoId}`} className="bi ms-2 bi-trash-fill btn btn-danger"></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
