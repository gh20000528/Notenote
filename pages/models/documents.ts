// models/document.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db'; // 引入你的 Sequelize 實例

class Document extends Model {
    declare id: number;
    declare title: string;
    declare userId: string;
    declare isArchived: boolean;
    declare parentDocument: number | null;
    declare content: string | null;
    declare icon: string | null;
    declare isPublished: boolean;
}

Document.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    userId: DataTypes.STRING,
    isArchived: DataTypes.BOOLEAN,
    parentDocument: DataTypes.INTEGER,
    context: DataTypes.STRING,
    icon: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: 'Document',
    timestamps: false // 不使用時間戳記
});

export default Document;
