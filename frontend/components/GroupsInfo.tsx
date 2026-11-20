import { IGroup } from "../interfaces/Groups";

interface GroupsInfoProps {
  groups: IGroup[] | null;
}

export function GroupsInfo({ groups }: GroupsInfoProps) {
  return (
    <div>
        {groups?.map((group) => (
          <div>
            <p>{group.name}</p>
            <p>{group.achievementApiNames}</p>
            <p>{group.logoAppId}</p>
          </div>
          ))}
    </div>
  );
}
