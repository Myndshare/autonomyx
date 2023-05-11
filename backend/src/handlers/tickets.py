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
        return list_tickets(event)
    elif event['httpMethod'] == 'POST':
        return submit_ticket(event)
    # Write the delete method
    elif event['httpMethod'] == 'DELETE':
        return delete_ticket(event)
    # Write the update method
    elif event['httpMethod'] == 'PUT':
        return update_ticket(event)
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'HTTP method not supported'})
        }
    
def list_tickets(event):
    tickets = get_all_tickets()
    
    # Return success response with ticket list
    return {
        'statusCode': 200,
        'body': json.dumps({'tickets': tickets})
    }

def delete_ticket(event):
    # Parse JSON data from the ticket submission form
    body = json.loads(event['body'])

    # Extract relevant information
    location = body['location']
    date = body['date']
    artist = body['artist']
    seat_number = body['seat_number']
    row_number = body['row_number']
    entry_time = body['entry_time']

    # Delete ticket from ticketing system
    delete_ticket_from_system(location, date, artist, seat_number, row_number, entry_time)

    # Return success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Ticket deleted successfully'})
    }

def update_ticket(event):
    # Parse JSON data from the ticket submission form
    body = json.loads(event['body'])

    # Extract relevant information
    location = body['location']
    date = body['date']
    artist = body['artist']
    seat_number = body['seat_number']
    row_number = body['row_number']
    entry_time = body['entry_time']

    # Update ticket in ticketing system
    update_ticket_in_system(location, date, artist, seat_number, row_number, entry_time)

    # Return success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Ticket updated successfully'})
    }

def submit_ticket(event):
    # Parse JSON data from the ticket submission form
    body = json.loads(event['body'])

    # Extract relevant information
    location = body['location']
    date = body['date']
    artist = body['artist']
    seat_number = body['seat_number']
    row_number = body['row_number']
    entry_time = body['entry_time']

    # Submit ticket to ticketing system
    submit_ticket_to_system(location, date, artist, seat_number, row_number, entry_time)

    # Return success response
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Ticket submitted successfully'})
    }

# FUNCTION IMPLEMENTATIONS FOR BACKEND____

def delete_ticket_from_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Deletes a ticket from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_NAME'])

    # Delete ticket from table
    table.delete_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

def update_ticket_in_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Updates a ticket in the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_NAME'])

    # Update ticket in table
    table.update_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        },
        UpdateExpression="set #attrName = :attrValue",
        ExpressionAttributeNames={
            '#attrName': 'entry_time'
        },
        ExpressionAttributeValues={
            ':attrValue': Decimal(str(time.time()))
        }
    )

def submit_ticket_to_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Submits a ticket to the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_NAME'])

    # Add ticket to table
    table.put_item(
        Item={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

def get_ticket_from_system(location, date, artist, seat_number, row_number, entry_time):
    """
    Retrieves a ticket from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_NAME'])

    # Get ticket from table
    response = table.get_item(
        Key={
            'location': location,
            'date': date,
            'artist': artist,
            'seat_number': seat_number,
            'row_number': row_number,
            'entry_time': entry_time
        }
    )

    # Return ticket
    return response['Item']

def get_all_tickets():
    """
    Retrieves all tickets from the ticketing system
    """
    # Connect to the DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_NAME'])

    # Get all tickets from table
    response = table.scan()

    # Return tickets
    return response['Items']


