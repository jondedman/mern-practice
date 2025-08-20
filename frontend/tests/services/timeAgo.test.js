import timeAgo from "../../src/services/timeAgo";

describe('timeAgo', () => {
  
  it('should return minutes ago for recent posts', () => {
    // Create a date 5 minutes ago
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const result = timeAgo(fiveMinutesAgo);
    expect(result).toBe('5m ago');
  });

  it('should return hours ago for posts from earlier today', () => {
    // Create a date 3 hours ago
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const result = timeAgo(threeHoursAgo);
    expect(result).toBe('3h ago');
  });

  it('should return days ago for older posts', () => {
    // Create a date 2 days ago
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const result = timeAgo(twoDaysAgo);
    expect(result).toBe('2d ago');
  });

});