// Andrew Teague

import { mount } from '@vue/test-utils';
import HomeMap from '@/components/HomeMap.vue'; 

describe('MapComponent', () => {
  it('adds spot on map when user confirms pin addition with valid input', async () => {
    const wrapper = mount(HomeMap);
    // Mock confirm and prompt functions
    global.confirm = jest.fn(() => true);
    global.prompt = jest.fn(() => 'Test Spot');
    // Simulate map click event
    await wrapper.vm.handleMapClick({ latLng: { lat: 40.7128, lng: -74.0060 } });
    // Expect createPin function to be called with correct parameters
    expect(wrapper.vm.createPin).toHaveBeenCalledWith('Test Spot', 40.7128, -74.0060, expect.anything(), expect.anything(), expect.anything());
    // Expect spot to be added to the map
    expect(wrapper.find('.spot').exists()).toBe(true);
  });

  it('does not add spot on map when user cancels pin addition', async () => {
    const wrapper = mount(HomeMap);
    // Mock confirm function
    global.confirm = jest.fn(() => false);
    // Simulate map click event
    await wrapper.vm.handleMapClick({ latLng: { lat: 40.7128, lng: -74.0060 } });
    // Expect createPin function not to be called
    expect(wrapper.vm.createPin).not.toHaveBeenCalled();
    // Expect no spot to be added to the map
    expect(wrapper.find('.spot').exists()).toBe(false);
  });
});
