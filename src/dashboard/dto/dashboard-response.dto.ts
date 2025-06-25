export class DashboardResponseDto {
  totalDogs: number;
  totalProducts: number;
  totalUsers: number;
  totalDonations: number;
  topDonatedDogs: {
    name: string;
    donations: number;
  }[];
}
