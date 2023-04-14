import DocumentRows from './DocumentRows';

const DocumentsTable = ({ myprops }) => {
	return (
		<div className="DocumentsTable table-responsive">
			<table className="table table-striped table-sm">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Type</th>
						<th scope="col">Document Name</th>
						<th scope="col">Date Modified</th>
						<th scope="col">Size</th>
					</tr>
				</thead>
				<tbody>
					<DocumentRows myprops={myprops} />
				</tbody>
			</table>
		</div>
	);
};

export default DocumentsTable;
