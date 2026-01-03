import { describe, test, expect } from 'vitest';
import { validateEvent, validateString } from '../src/eventService.js';

describe('createEvent', () => {

    test('it should reject invalid event with too small title', () => {
        // Arrange
        let invalidEvent = {
            title: 'T',
            description: 'Test description',
            category: 'Test category',
            location: 'Test location',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 36000)
        };
        // Act & Assert
        expect(() => validateEvent(invalidEvent)).toThrow('Validation error: Title must be between 2-50 letters.\n');
    });

    test('it should reject invalid event with too early endTime', () => {
        // Arrange
        let invalidEvent = {
            title: 'Test title',
            description: 'Test description',
            category: 'Test category',
            location: 'Test location',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() - 36000)
        };
        // Act & Assert
        expect(() => validateEvent(invalidEvent)).toThrow('Validation error: End Time cannot be earlier than Start Time.\n');
    });

    test('it should return success as false and an error message', () => {
        //Arrange
        let invalidStringMin = '2';
        let invalidStringMax = '123456789112345678921234567893123456789412345678951';
        //Act
        let result1 = validateString('String', invalidStringMin, 2, 50, true);
        let result2 = validateString('String', invalidStringMax, 2, 50, true);
        //Assert
        expect(result1.message).toBe('String must be between 2-50 letters.\n');
        expect(result2.message).toBe('String must be between 2-50 letters.\n');
    });
});