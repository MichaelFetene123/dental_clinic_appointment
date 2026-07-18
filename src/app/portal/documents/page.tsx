import { getPortalDocuments } from "@/lib/actions/queries/portal-queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { FileIcon, ExternalLink } from "lucide-react";

export default async function PortalDocumentsPage() {
    const documents = await getPortalDocuments();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
                <p className="text-muted-foreground">Access your medical documents, x-rays, and prescriptions.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        No documents have been uploaded to your portal yet.
                    </div>
                ) : (
                    documents.map((doc) => (
                        <Card key={doc.id} className="hover:bg-muted/50 transition-colors">
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="block">
                                <CardHeader className="pb-3 flex flex-row items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <FileIcon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            {doc.name}
                                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                        </CardTitle>
                                        <CardDescription>
                                            {format(new Date(doc.uploadedAt), "PPP")}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                            </a>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
