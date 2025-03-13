export declare class CreateTicketDto {
    title: string;
    description: string;
    priority: string;
    category: string;
}
export declare class UpdateTicketDto {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    category?: string;
}
export declare class CreateCommentDto {
    text: string;
}
