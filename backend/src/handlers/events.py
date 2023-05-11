import boto3
import json
import os
# import requests
import time

from datetime import datetime, timedelta
from decimal import Decimal
from random import randint

def handler(event, context):
    # Determine which handler function to invoke
    if event['httpMethod'] == 'GET':
        return list_events(event)
    elif event['httpMethod'] == 'POST':
        return submit_event(event)
    # Write the delete method
    elif event['httpMethod'] == 'DELETE':
        return delete_event(event)
    # Write the update method
    elif event['httpMethod'] == 'PUT':
        return update_event(event)
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'HTTP method not supported'})
        }
    
def list_events(event):
    events = get_all_events()
    
    # Return success response with event list
    return {
        'statusCode': 200,
        'body': json.dumps({'events': events})
    }

def delete_event(event):
    # Parse JSON data from the event submission form
    body = json.loads(event['body'])

    # Extract relevant information
    location = body['location']
    date = body['date']
    artist = body['artist']

    # Delete event from events table
    delete_event_from_system(location, date, artist)

    # Return success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Event deleted successfully'})
    }

def update_event(event):
    # Parse JSON data from the event submission form
    body = json.loads(event['body'])

    # Extract relevant information
    location = body['location']
    date = body['date']
    artist = body['artist']
    ticket_count = body['ticket_count']

    # Update event in events table
    update_event_in_system(location, date, artist, ticket_count)

    # Return success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Event updated successfully'})
    }

def submit_event(event):
    # Parse JSON data from the event submission form
    body = json.loads(event['body'])

    # Extract relevant information
    location = body['location']
    date = body['date']
    artist = body['artist']
    ticket_count = body['ticket_count']

    # Submit event to events table
    submit_event_to_system(location, date, artist, ticket_count)

    # Return success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Event submitted successfully'})
    }

# FUNCTION IMPLEMENTATIONS FOR BACKEND
def get_all_events():
    """
    Returns a list of all events in the events table
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['EVENTS_TABLE_NAME'])

    # Get all events from table
    response = table.scan()

    # Return list of events
    return response['Items']

def delete_event_from_system(location, date, artist):
    """
    Deletes an event from the events table
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['EVENTS_TABLE_NAME'])

    # Delete event from table
    table.delete_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist
        }
    )

def update_event_in_system(location, date, artist, ticket_count):
    """
    Updates an event in the events table
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['EVENTS_TABLE_NAME'])

    # Update event in table
    table.update_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist
        },
        UpdateExpression='SET ticket_count = :val1',
        ExpressionAttributeValues={
            ':val1': ticket_count
        }
    )