import DocumentRows from './DocumentRows';

const DocumentsTable = ({ files, loading, filterText }) => {
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
					<DocumentRows
						files={files}
						loading={loading}
						filterText={filterText}
					/>
				</tbody>
			</table>
		</div>
	);
};

export default DocumentsTable;
