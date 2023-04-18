import { useState, useEffect } from 'react';
import {
	updateDoc,
	doc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	deleteDoc,
	toDate,
	Timestamp,
} from 'firebase/firestore';
// import { toast } from 'react-toastify';

const DocumentRows = ({ files, loading, filterText }) => {
	return (
		<>
			{!loading &&
				files?.length > 0 &&
				files.map((file, index) => {
					console.log(
						file.data.name.toLowerCase().indexOf(filterText.toLowerCase())
					);

					// format timestamps
					let dateObj = new Timestamp(
						file.data.timestamp.seconds,
						file.data.timestamp.nanoseconds
					);

					// search filter using indexOf file name that contains input string: if input text is not contained in the file name (indexOf returns -1) return the loop without rendering that file
					if (
						file.data.name.toLowerCase().indexOf(filterText.toLowerCase()) ===
						-1
					) {
						return;
					}

					return (
						<tr key={index}>
							<td>{index + 1}</td>
							{file.data.type === 'application/pdf' ? (
								<td>
									<i className="bi bi-file-pdf text-danger"></i>
								</td>
							) : (
								<td>
									<i className="bi bi-file-image"></i>
								</td>
							)}

							<td>{file.data.name}</td>
							<td>{dateObj.toDate().toString()}</td>
							<td>{file.data.size / 1000} kb</td>
						</tr>
					);
				})}
		</>
	);
};

export default DocumentRows;
