import { CreateAwardDto } from './create-award.dto';
declare const UpdateAwardDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAwardDto>>;
export declare class UpdateAwardDto extends UpdateAwardDto_base {
    name?: string;
    type?: string;
    poin?: number;
    image?: string;
    profileId?: string;
}
export {};
